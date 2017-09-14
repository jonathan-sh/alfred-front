import _ from 'lodash';

class Array
{
    control(array, value)
    {
        let found = _.find(array, (item)=> { return item === value });

        if(found !== null && found !== undefined)
        {
            array = _.remove(array, (v)=> {return v === value});
        }
        else
        {
            array.push(value);
        }

        return array;
    };
}

export default Array;