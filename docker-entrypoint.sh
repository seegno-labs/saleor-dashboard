#!/bin/bash

sed -i "s,http://localhost:8000/graphql/,$API_URI,g" dashboard/dashboard.*.js

exec "$@"
