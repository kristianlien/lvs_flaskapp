from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/form")
def form():
    return render_template("index.html")

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['text']  
    cursor.execute("INSERT INTO skibidi (value) VALUES (?)", (name,))
    conn.commit()
    return render_template("navn.html", skibidi = name)

@app.route("/db")
def db():
    cursor.execute("SELECT value FROM skibidi")
    data = cursor.fetchall()
    print(data)
    return "SUCCESS!"

if __name__ == '__main__':
    app.run(debug=True)
