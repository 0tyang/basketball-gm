#from gevent import monkey
#monkey.patch_all()
from flask import Flask, g
import MySQLdb
from contextlib import closing
#from gevent.event import Event

DEBUG = True
SECRET_KEY = 'A0Zr98j/gry43 etwN]LWX/,?RT'
DB = 'bbgm'
DB_USERNAME = 'testuser'
DB_PASSWORD = 'test623'
TRY_NUMPY = True

app = Flask(__name__)
app.config.from_object(__name__)
#app.event = Event()

import bbgm.views
import bbgm.league_views

def connect_db():
    return MySQLdb.connect('localhost', app.config['DB_USERNAME'], app.config['DB_PASSWORD'], app.config['DB'])


def bulk_execute(sql):
    """Executes a series of SQL queries, even if split across multiple lines.

    This emulates the functionality of executescript from sqlite3.

    Args:
        sql: A string containing SQL queries to be executed.
    """
    from subprocess import Popen, PIPE
    process = Popen('mysql %s -u%s -p%s' % (app.config['DB'], app.config['DB_USERNAME'], app.config['DB_PASSWORD']), stdin=PIPE, stdout=PIPE, stderr=PIPE, shell=True)
    stdoutdata, stderrdata = process.communicate(sql)
#    print sql
#    print stdoutdata
#    print stderrdata

def init_db():
    f = app.open_resource('data/core.sql')
    sql = ''
    for line in f:
        sql += line

    bulk_execute(sql)

@app.before_request
def before_request():
    g.db_conn = connect_db()
    g.db = g.db_conn.cursor()  # Return a tuple
    g.dbd = g.db_conn.cursor(MySQLdb.cursors.DictCursor)  # Return a dict
    g.starting_season = 2012
    g.salary_cap = 60000
    g.ticket_price = 45
    g.num_teams = 30
    g.season_length = 82  # Changing this will break things

@app.teardown_request
def teardown_request(exception):
    g.db_conn.close()
