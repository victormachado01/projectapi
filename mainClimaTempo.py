import requests
import json
from index import Climatempo #importando a classe Climatempo do arquivo index.py
# import MySQLdb

objClimaTempo = Climatempo('Pompéia','SP',requests,json)

objClimaTempo.setResult()

print (objClimaTempo.getResult())