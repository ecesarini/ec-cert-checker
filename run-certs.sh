#/bin/bash

rm -f mailing/*.txt
./jota-cert-checker.sh -f ssnn_domains -o html
./jota-cert-checker.sh -f ssnn_domains -o terminal | tr -cd '\11\12\15\40-\176' | cut -d "|" -f2-5 > mailing/output.txt

grep -i -E '(alert|expired)' mailing/output.txt | grep 'infn.it' > mailing/list.txt
if [ -s mailing/list.txt ]
then
  printf "Stato certificati:\n\n" | cat - mailing/list.txt | mail -s 'Test Certificati' ettore.cesarini@cnaf.infn.it
  #cat mailing/list.txt | mail -s 'Test Certificati' ettore.cesarini@cnaf.infn.it
fi
