# Fluentd

Introduction [https://docs.fluentd.org/](https://docs.fluentd.org/)

### Fluentd Regular Expression Editor

[http://fluentular.herokuapp.com/](http://fluentular.herokuapp.com/)


### Configuration Example

**Source:** `iptable`
```
<source>
  @type tail
  path /var/log/iptable/tcpme.log
  pos_file /var/log/td-agent/tcpme.log.pos
  tag tcpme

  <parse>
    @type regexp
    expression /^(?<time>[^\]]*) (?<host>[^ ]*) (?<log_source>[^ ]*)\: \[(?<wtf>[^ ]*)\] \[TCPME\]IN\=(?<in>[^ ]*) OUT\=(?<out>[^ ]*) MAC\=(?<mac>[^ ]*) SRC\=(?<src>[^ ]*) DST\=(?<dst>[^ ]*) LEN\=(?<len>[^ ]*) TOS\=(?<tos>[^ ]*) PREC\=(?<prec>[^ ]*) TTL\=(?<ttl>[^ ]*) ID\=(?<id>[^ ]*) (?<df>[^ ]*)\s?PROTO\=(?<proto>[^ ]*) SPT\=(?<spt>[^ ]*) DPT\=(?<dpt>[^ ]*) WINDOW\=(?<window>[^ ]*) RES\=(?<res>[^ ]*) (?<sig>[^\]]*)\s?URGP\=(?<urgp>[^ ]*)\s?$/
    time_format %b %e %H:%M:%S
  </parse>
</source>

<match tcpme>
  @type stdout
</match>
```


**Source:** `unbound`

```
<source>
  @type tail
  path /var/log/unbound/unbound.log
  pos_file /var/log/td-agent/unbound.log.pos
  tag tcpme

  <parse>
    @type regexp
    expression /^\[(?<time>[^\]]*)\] [^ ]* (?<level>[^ ]*)\: (?<src>[^ ]*) (?<query>[^ ]*) (?<record_type>[^ ]*) (?<dir>[^ ]*)$/
    time_format %s
  </parse>
</source>

<match tcpme>
  @type stdout
</match>
```