
class TreatsDate {

    static notNull(item) {
        try
        {
            return item ? item : '-';
        }
        catch (err)
        {
            return '-';
        }
    }

    static toDateString(v){
        try
        {
            return this.addZero(v[2]) + '/' +
                   this.addZero(v[1]) + ' - ' +
                   this.addZero(v[3]) + ':' +
                   this.addZero(v[4]) + ':' +
                   this.addZero(v[5]);
        }
        catch (err)
        {
            return "-"
        }

    }


    static toDate(v) {

        try
        {
            new Date(v[0], v[1], v[2], v[3], v[4])
        }
        catch (err)
        {
            return "-"
        }

    }

    static addZero(v)
    {
        let x = v.toString();

        try
        {
            return (x.length!==1)? x : '0'+x;
        }
        catch (err)
        {
            return "-"
        }
    }

}
export default TreatsDate;
