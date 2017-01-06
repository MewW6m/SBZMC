#!/usr/local/python/bin/python
"""
Copyright (c) 2016 Yoshihiro Furudate
Released under the MIT license
http://opensource.org/licenses/mit-license.php
"""
import sys, os
from wsgiref.handlers import CGIHandler
from sbzmc import app

CGIHandler().run(app)
