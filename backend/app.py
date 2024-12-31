from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/move', methods=['POST'])
def make_move():
    data = request.json
    return jsonify({"status": "success", "message": "Move received", "board": data['board']})

@app.route('/api/check_winner', methods=['POST'])
def check_winner():
    data = request.json
    board = data['board']
    winner = get_winner(board)
    return jsonify({"winner": winner})

def get_winner(board):
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for combo in winning_combinations:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] and board[combo[0]] != "":
            return board[combo[0]]
    return "draw" if "" not in board else None

if __name__ == '__main__':
    app.run(debug=True)