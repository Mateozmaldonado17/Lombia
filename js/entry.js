var Lombia = (function() {
    var _d = document;
    
    function Lombia(app) {
        var result = this.getElement(app);
        if (result === false) {
            console.log(new Error('element no exist'));
        }
        else {
            this.interpolation(result, app.data);
        }
    };

    Lombia.prototype.setError = function(message) {
        return document.getElementsByTagName('body')[0].outerHTML = message;
    }
    
    Lombia.prototype.getElement = function(app) {
        var el = _d.querySelector("#" + app.name);
        return el ? el : false;
    }

    Lombia.prototype.setFilter = function(word, filter) {
        if (filter === 'capitalize') {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        else if (filter === 'uppercase') {
            return word.toUpperCase();
        }
        else if (filter === 'lowercase') {
            return word.toLowerCase();
        }
        return false;
    }

    Lombia.prototype.interpolation = function(result, data) {
        var outhtml = result.outerHTML;
        var reg = new RegExp(/{{\s*(.*)+\s*}}/g);
        var res = outhtml.match(reg);
        res.forEach(function(e) {
            var word = e.replace(/[{}]/g, '');
            var wordFilter = word.split("|");
            if (data[wordFilter[0]]) {
                var convertWord = wordFilter.length === 2 ? this.setFilter(data[wordFilter[0]], wordFilter[1]) : data[wordFilter[0]];
                outhtml = outhtml.replace(e, convertWord);
            }
            else {
                this.setError('# element no exist');
                return console.error(new Error('error element ' + word + ' not exist in data'));
            }
        }.bind(this));
        result.outerHTML = outhtml;
    };
    
    return Lombia;
})();