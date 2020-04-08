#!/bin/bash

sed -i "s/localhost:8000/$API_URI/g" dashboard/dashboard.*.js

exec "$@"
