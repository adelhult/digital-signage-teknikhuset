# Digital signage system for Teknikhuset

# Set-up
[Download the pre-built files from here](https://github.com/adelhult/digital-signage-teknikhuset/releases/tag/v0.1b).

cd into the `backend` directory

Ensure that you have Python 3.6+ on your machine, then install the dependencies by running:

`pip install -r requirements.txt`

Set the environmental variable TEKNIKHUSET_DIR to the path where the images and info files are stored. This should be the absolute path to the frontend directory.

Now you can start the server by running `flask run`.

Finally, open the `frontend/index.html` file in a browser and you are done.


# Adding content

Just add txt-files inside of `frontend/info` or png/jpg files inside of the `frontend/images` directory.

Note: if a .txt file and an image file has the same name, they will always be paired together when displayed.


# Customizing
Most config options can be found inside of `frontend/config.js`.

