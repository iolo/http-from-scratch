#!/bin/bash
curl --http2 -H 'accept: application/dns-json' https://1.1.1.1/dns-query?name=example.com
