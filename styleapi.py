from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/", methods=['POST'])
def styler():
    data = request.get_json()
    print(data)
    return 'Hi'
    
if __name__ == '__main__':
	app.run('0.0.0.0')

