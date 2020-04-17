"""Back-end for teknikhuset info screen software.

Important, set the TEKNIKHUSET_DIR env!
"""

# FLASK_APP = app
# SIGNAGE_CONTENT_DIR = path to public dir...
# flask run

import glob, os
from sys import exit
from flask import Flask, jsonify, send_file
from flask_cors import CORS
from random import shuffle
try:
    directory = os.environ['SIGNAGE_CONTENT_DIR']
except KeyError:
    print("ERROR: The env variable SIGNAGE_CONTENT_DIR needs to be defined.")
    exit()

app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():
    return "Välkommen till Teknikhusets API, besök /images, /info, /info-with-image eller /get-image/<filnamn>"

@app.route('/images')
def images():
    return jsonify(get_image_paths())

@app.route('/get-image/<name>')
def get_image(name):
    file_path = directory + "/images/" + name
    extension = name.split(".")[1].lower()
    return send_file(file_path, mimetype=f"image/{extension}")

@app.route('/info')
def info():
    return jsonify(get_info_files())

@app.route('/info-with-image')
def info_with_image():
    """Returns a list that contains a tuple with an info entry + an img
        (for every info entry that exists).    
    """

    info = get_info_files()

    # return an empty array if there are no info entries
    if len(info) < 1:
        return jsonify([])

    images = get_image_paths()
    
    # if there are no images, we can skip a lot of steps
    # and just return a list of tuples where the image value is None.
    if len(images) < 1:
        return jsonify([(i, None) for i in info])

    images_without_extension = [img.split(".")[0] for img in images]
    info_without_corresponding_img = []
    pairs = []

    # check for instances where the info name is the same
    # as the info image name, then append them as a tuple to the list "pairs"
    for i in info:
        info_name = i["name"].split(".")[0]
        
        if info_name in images_without_extension:
            img_index = images_without_extension.index(info_name)

            pairs.append((i, images[img_index]))

            del images[img_index]
            del images_without_extension[img_index]
        else:
            info_without_corresponding_img.append(i)
    
    if len(info_without_corresponding_img) < 1:
        return jsonify(pairs)

    shuffle(images)

    for index, info in enumerate(info_without_corresponding_img):
        if index + 1 > len(images):
            pairs.append((info, None))
        else:
            pairs.append((info, images[index]))

    return jsonify(pairs)

def get_info_files():
    info_list = []
    os.chdir(directory + "/info")
    for filename in glob.glob("*.txt"):
        path = f"{directory}/info/{filename}"
        with open(path, 'r', encoding='utf8') as f:
            content = f.read()

        info_list.append({"content": content, "name": filename})

    return info_list

def get_image_paths():
    os.chdir(directory + "/images")
    jpg_images = [file for file in glob.glob('*.jpg')]
    png_images = [file for file in glob.glob('*.png')]
    return jpg_images + png_images
