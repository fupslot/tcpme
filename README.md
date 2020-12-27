tcpme client [host] --port 3232
tcpme serve [port]


`NODE_TLS_REJECT_UNAUTHORIZED=0 DEBUG=* tcpme client`

`iptables -D INPUT -m tcp -p tcp --dport 3232c
gs -j LOG_ACCEPT --log-prefix "INPUT:TCPME"`