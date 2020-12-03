from flask import Flask, render_template, url_for, flash, redirect
from jinja2.utils import urlize

from forms import RegistrationForm, LoginForm
app = Flask(__name__)

app.config['SECRET_KEY'] = '0def4e83ebac03fca5434e7a8a30644b'

post_list = [
    {
        'author':'Rahul',
        'title':'blog post 1',
        'content': 'Hello in my blog',
        'date': '28 April, 2020',
    },
    {
        'author':'Jon',
        'title':'blog post 2',
        'content': 'Hello in my blog',
        'date': '12 April, 2020',
    },
]

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html", posts=post_list)

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f"Account created for {form.username.data}!", "success")
        return redirect(url_for("home"))
    return render_template("register.html", title="Register", form=form)

@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == "admin@log.com" and form.password.data == "password":
            flash("You have been logged in!", "success")
            return redirect(url_for('home'))
        else:
            flash("Login unsuccessfull", 'danger')
    return render_template("login.html", title="Login", form=form)

if __name__ == "__main__":
    app.run(debug=True)