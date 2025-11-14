from flask import Flask, render_template
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def index():
    server_time = datetime.utcnow().isoformat() + "Z"
    return render_template("index.html", server_time=server_time)

if __name__ == "__main__":
    app.run(debug=True)
