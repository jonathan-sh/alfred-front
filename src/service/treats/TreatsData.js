
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


    static toDate(v) {

        try {
            return v[2] + '/' + v[1] + '/' + v[0] + ' - ' + v[3] + ':' + v[4];
        }
        catch (err) {
            return "-"
        }

    }

}
export default TreatsDate;
