# Certificate Monitor

Monitoraggio dei certificati per i _Servizi Nazionali_.

Fork del progetto [Jota Cert Checker](https://github.com/juliojsb/jota-cert-checker).


## Descrizione

Lo script permette di generare una pagina html contente una lista di server con lo stato e il tempo di validità dei relativi certificati. 

## Utilizzo

Clonare il progetto in una cartella locale: (e.g ```/var/www/jcc```) e rendere accessibile la cartella tramite _web server_.
Popolare il file ```domains``` con i server desiderati secondo la sintassi `fqdn:port`.
```bash
server01.example.it:443
server02.example.it:993
...
```
> :warning: la porta è **obbligatoria** anche se si tratta della 443.

Eseguendo il comando:
```bash
$ ./jota-cert-checker -f domains -o html
```
Verrà generato il file `index.html` contente il markup con la lista di server aggiornata.
È anche possibile avere i risultati direttamente da terminale
```bash
$ ./jota-cert-checker -f domains -o terminal
```
Per automatizzare il processo e' stato creato lo script `run-certs.sh` che esegue i seguenti passi:
- Rimuove il contenuto della cartella mailing.
- Crea il file `mailing/output.txt` contenente l'output dalla lista server con lo stato aggiornato.
- Crea il file `mailing/list.txt` contente la lista di server con stato del certificato da tenere sotto controllo (_alert_<30gg; _expired_)
- Manda una mail contente la lista dei server del punto precedente.

Per automatizzare il controllo sarebbe opportuno creare un _cronjob_, e.g.
```bash
0 5 * * * /var/www/jcc/run-certs.sh
```

## Sviluppo
Nella cartella `static` sono presenti i riferimenti per la customizzazione dello stile e js.


