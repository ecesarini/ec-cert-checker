export class TableSorter {
    constructor(table) {
        this.table = table;
        this.clckBar = this.table.querySelectorAll('#status-row th');
        this.clkCell = this.table.querySelectorAll('td');
        this.clckAction = ['domain', 'date', 'days', 'status'];
        this.orderToggler = true;
        this.init();
    }

    init() {
        this.clckBar.forEach(element => element.addEventListener('click', this));
        this.clkCell.forEach(element => element.addEventListener('dblclick', this));
    }

    handleEvent(e) {
        let ect = e.currentTarget,
            cIndex = this.clckAction.findIndex(i => i == ect.classList.value) + 1;

        switch(e.type) {
            case 'click':
            case 'dblclick':
                this.sort(cIndex);
                break;
        }
    }
        
    sort(cIndex) {
        const tbs = {            
            sortRows(cin) {
                const rows = Array.from(document.querySelectorAll('tbody tr')).slice(1),
                    sel = 'td:nth-child(' + cin + ')';
                let values = [];
            
                rows.forEach( (element, index) => {
                    values.push( {value: element.querySelector(sel).innerText, row: index} );
                });
                return values;		
            },
            domainSorter(a, b) {
                let nameA = a.value.toLowerCase(),
                    nameB = b.value.toLowerCase();
                return (nameA < nameB)? -1: 1;
            },
            dateSorter(a, b) {
                a = a.value.split(' ');
                b = b.value.split(' ');
                const oSorter = {
                    monthToNum(m) {
                        const moNum = [
                            ['Jan', 1], ['Feb', 2], ['Mar', 3], ['Apr', 4], ['May', 5], ['Jun', 6], ['Jul', 7], ['Aug', 8], ['Sep', 9], ['Oct', 10], ['Nov', 11], ['Dec', 12]
                        ];
                        return moNum[moNum.findIndex(i => i[0] === m)][1];
                    },
                    timeToSeconds(t) {
                        let tSec = t.split(':');
                        tSec = tSec.map(i => Number.parseInt(i));                                                        
                        return tSec[0]*3600 + tSec[1]*60 + tSec[0];
                    }
                },
                va = [Number.parseInt(a[3]), oSorter.monthToNum(a[0]), Number.parseInt(a[1]), oSorter.timeToSeconds(a[2])],
                vb = [Number.parseInt(b[3]), oSorter.monthToNum(b[0]), Number.parseInt(b[1]), oSorter.timeToSeconds(b[2])];
                let vRes = [];
                for(let i = 0; i < va.length; i++) {
                    vRes.push(va[i] - vb[i]);
                }
                for(let val of vRes) {
                    if(val === 0) {
                        continue;
                    } else {
                        return (val > 0)? 1: -1;
                    }
                }
            },
            daysSorter(a, b) {
                return a.value - b.value;
            },
            statusSorter(a, b) {
                a = a.value.toLowerCase();
                b = b.value.toLowerCase();
                const statusHiera = [
                    ['expired', 0], ['alert', 1], ['warning', 2], ['ok', 3]
                    ],
                    weighter = (w) => {  // inside brackets you need 'return'. //Otherwise: weighter = (w) => status[status.findIndex(i => i[0] === w)][1];
                        return statusHiera[statusHiera.findIndex(i => i[0] === w)][1];
                    },
                    aw = weighter(a),
                    bw = weighter(b);
                
                return aw - bw;
            }
        },
        sortType = (oVal, cin, tbs) => {                
            let ret;                
            switch(cin) {
                case 1:
                    ret = oVal.sort(tbs.domainSorter);
                    break;
                case 2:
                    ret = oVal.sort(tbs.dateSorter);
                    break;
                case 3:
                    ret = oVal.sort(tbs.daysSorter); 
                    break;
                case 4:
                    ret = oVal.sort(tbs.statusSorter);
                    break;
            }
            return ret;
        };
        
        let ordered = sortType(tbs.sortRows(cIndex), cIndex, tbs);
        this.tableBuilder(ordered);
        //debugger;
    }
    tableBuilder(arrOrdered) {
        arrOrdered = (this.orderToggler)? arrOrdered: arrOrdered.reverse();
        const tb = this.table.querySelector('tbody'),
            tbRows = Array.from(tb.querySelectorAll('tr')).slice(1);
        arrOrdered.forEach( aor => {
            tb.append(tbRows[aor.row]);
        });
        this.orderToggler = !this.orderToggler;
    }
}
