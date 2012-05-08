#from gevent import monkey
#monkey.patch_all()
from flask import Flask, g
from flask.ext.assets import Environment, Bundle
import logging
import MySQLdb
import subprocess
from contextlib import closing
#from gevent.event import Event

BBGM_VERSION = '2.0.0alpha'
DEBUG = True
SECRET_KEY = 'A0Zr98j/gry43 etwN]LWX/,?RT'
DB = 'bbgm'
DB_USERNAME = 'testuser'
DB_PASSWORD = 'test623'
TRY_NUMPY = True

app = Flask(__name__)
app.config.from_object(__name__)
#app.event = Event()

# Logging
class ContextFilter(logging.Filter):
    """This filter injects the league ID, if available into the log."""
    def filter(self, record):
        try:
            record.league_id = g.league_id
        except RuntimeError:
            record.league_id = '?'
        return True
fh = logging.FileHandler('debug.log')
fh.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s %(levelname)s: League %(league_id)s: %(message)s [in %(pathname)s:%(lineno)d]')
fh.setFormatter(formatter)
f = ContextFilter()
app.logger.addFilter(f)
app.logger.setLevel(logging.DEBUG)
app.logger.addHandler(fh)
app.logger.debug('Started')

# Assets
assets = Environment(app)

# Views
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
    process = subprocess.Popen('mysql %s -u%s -p%s' % (app.config['DB'], app.config['DB_USERNAME'], app.config['DB_PASSWORD']), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdoutdata, stderrdata = process.communicate(sql)
#    print sql
#    print stdoutdata
#    print stderrdata

def init_db():
    # Delete any current tables in database
    process = subprocess.Popen('mysqldump -u%s -p%s --add-drop-table %s | grep ^DROP | mysql -u%s -p%s %s' % (app.config['DB_USERNAME'], app.config['DB_PASSWORD'], app.config['DB'], app.config['DB_USERNAME'], app.config['DB_PASSWORD'], app.config['DB']), stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdoutdata, stderrdata = process.communicate()

    # Create new tables
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
    g.bbgm_version = app.config['BBGM_VERSION']
    g.starting_season = 2012
    g.salary_cap = 60000
    g.ticket_price = 45
    g.num_teams = 30
    g.season_length = 82  # Changing this will break things

#    g.db.execute('SET autocommit = 1')

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db_conn'):
        g.db.execute('COMMIT')
        g.db_conn.close()

@app.template_filter()
def number_format(value, tsep=',', dsep='.'):
    s = unicode(value)
    cnt = 0
    numchars = dsep + '0123456789'
    ls = len(s)
    while cnt < ls and s[cnt] not in numchars:
        cnt += 1

    lhs = s[:cnt]
    s = s[cnt:]
    if not dsep:
        cnt = -1
    else:
        cnt = s.rfind(dsep)
    if cnt > 0:
        rhs = dsep + s[cnt+1:]
        s = s[:cnt]
    else:
        rhs = ''

    splt = ''
    while s != '':
        splt = s[-3:] + tsep + splt
        s = s[:-3]

    return lhs + splt[:-1] + rhs
