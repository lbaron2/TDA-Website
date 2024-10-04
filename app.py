from flask import Flask, render_template
import mimetypes

mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/javascript', '.mjs')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('text/html', '.html')

app = Flask(__name__, template_folder=r'templates', static_folder=r"static") #says app is a flask server

@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")

@app.route("/3D-DAC.html")
def printedDAC():
    return render_template("3D-DAC.html")

@app.route("/Air-Sep.html")
def airSep():
    return render_template("Air-Sep.html")

@app.route("/buzz.html")
def buzz():
    return render_template("buzz.html")

@app.route("/Coated-Hex.html")
def coatedHex():
    return render_template("Coated-Hex.html")

@app.route("/DAC-Plant.html")
def dacPlant():
    return render_template("DAC-Plant.html")

@app.route("/DACtoMeOH.html")
def DACtoMeOH():
    return render_template("DACtoMeOH.html")

if __name__ == '__main__':
    app.run()

