
class QueryBuilder {
  build(analyzed) {
    if (analyzed.ofWhat) {
      return this.buildPlace(analyzed);
    }
  }

  buildPlace(analyzed) {
    console.log(analyzed);
    let fields = ['inV().name as name', 'inV().address as address', 'outV().name as CityName'];
    if (analyzed.what === 'orario') {
      fields.push('inV().time as time');
    }

    return 'select ' + fields.join(', ') + ' from HasPlace where inV().type = \'' + analyzed.ofWhat.toLowerCase() + '\' and outV().name = \'' + analyzed.city + '\'';
  }
}

module.exports = new QueryBuilder();