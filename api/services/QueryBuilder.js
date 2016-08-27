
class QueryBuilder {
  build(analysed) {
    console.log(analysed)
    if (analysed.ofWhat) {
      return (analysed.deep && analysed.deep > 1) ? this.buildPlaceDeep(analysed, analysed.deep) : this.buildPlace(analysed);
    }
  }

  buildPlace(analysed) {
    let fields = ['inV().name as name', 'inV().address as address', 'inV().phone as phone', 'inV().sponsored as sponsored', 'outV().name as cityName'];
    
    if (analysed.what === 'orario') {
      fields.push('inV().time as time');
    }

    return 'select ' + fields.join(', ') + ' from HasPlace where inV().type = \'' + analysed.ofWhat.toLowerCase() + '\' and outV().name = \'' + analysed.city + '\'';
  }

  buildPlaceDeep(analysed, deepLevel) {
    let fields = [
      'inE().inV().name as name',
      'inE().inV().address as address',
      'inE().inV().phone as phone',
      'inE().inV().sponsored as sponsored',
      'inE().inV().time as time',
      'inE().outV().name as cityName'
    ];

    return 'select ' + fields.join(', ') + ' from (TRAVERSE out() from (select from City where name = \'' + analysed.city + '\')) where type = \'' + analysed.ofWhat.toLowerCase() + '\' AND @class = \'Place\'';
  }
}

module.exports = new QueryBuilder();