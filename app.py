from flask import Flask, render_template
import mimetypes
from waitress import serve

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html');

app = Flask(__name__, template_folder=r'templates', static_folder=r"static") #says app is a flask server

@app.route("/")
def index():
    return render_template("community-benefits-projects.html")

@app.route("/<var>")
def general(var):
    return render_template(f"{var}")

if __name__ == '__main__':
    serve(app,listen=f"*:80",url_scheme='https')
    # app.run()

