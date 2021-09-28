const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(word => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

const endpointCase = (str) => {
    return str.toLowerCase().split(' ').join('-')
}

module.exports = {
    titleCase,
    endpointCase
}