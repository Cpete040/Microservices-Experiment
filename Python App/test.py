from flask import Flask, json, request
from flask_cors import CORS, cross_origin
import random

api = Flask(__name__)
cors = CORS(api)
api.config['CORS_HEADERS'] = 'Content-Type'

#Api request handler that determines if the game is over and provides the next move
@api.route('/move', methods=['GET'])
@cross_origin()
def get_move():
  game = json.loads(request.args["game"])
  game["winner"] = validateResult(game)
  if not game["winner"]:
    select_random_move(game["state"])
    game["winner"] = validateResult(game)
  return game

#Randomly selects the next move from those available
def select_random_move(state):
  unselected_indices = [];
  for i in range(9):
    if state[i] == "":
      unselected_indices.append(i)
  state[random.choice(unselected_indices)] = "O"
  return state

#determines if the game is over and returns the result
win_conditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
def validateResult(game):
  for j in range(8):
    a = game["state"][win_conditions[j][0]]
    b = game["state"][win_conditions[j][1]]
    c = game["state"][win_conditions[j][2]]

    if a=="" or b=="" or c=="":
      continue
    if a == b == c:
      if a=="X":
        return "X"
      else:
        return "O"
  counter = 0
  for cell in game["state"]:
    if cell != "":
      counter=counter+1
  if counter==9:
    return "Tie"
  return ""


if __name__ == '__main__':
    api.run()