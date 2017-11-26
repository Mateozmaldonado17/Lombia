var Lombia = (function() {
    var _d = document;
    var superData = null;
    function Lombia(app) {
        superData = app.data;
        var result = this.getElement(app.name);
        if (result === false) {
            console.log(new Error('element no exist'));
        }
        else {
            this.getElements(result);
        }
    };

    Lombia.prototype.preIterpolation = function(elem) {
        if (elem) {
            if (elem.nodeName === "#text") {
                
                this.interpolation(elem, superData.data);
            }
            else {
                this.getElements(elem);
            }
        }
    }

    Lombia.prototype.getElements = function(elements) {
        if (!elements) return console.error("This element does exist");
        elements.childNodes.forEach (e => {
            this.preIterpolation(e);
        });
    }

    Lombia.prototype.setError = function(message) {
        return document.getElementsByTagName('body')[0].outerHTML = message;
    }
    
    Lombia.prototype.getElement = function(name) {
        var el = _d.querySelector("#" + name);
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

    Lombia.prototype.GetOnlyInsideTags = function(outhtml = null) {
        if (outhtml) {
            var reg = new RegExp(/>\s*(.*)+\s*</);
            var res = outhtml.match(reg);
        }
        return false;
    }

    Lombia.prototype.setErrorForObject = function(e) {
        console.error('try other method for renderize a object' + e);
        return '[is an object]';
    }

    Lombia.prototype.interpolation = function(result) {
        var data = superData;
        var outhtml = result.textContent;
        var reg = new RegExp(/{{\s*(.*)+\s*}}/g);
        var res = outhtml.match(reg);
        if (res && data) {
            res.forEach(function(e) {
                var word = e.replace(/[{}]/g, '');
                var wordFilter = word.split("|");
                if (typeof data[wordFilter[0]] === "function") return console.error("Cannot renderize a Function " + e);
                if (data[wordFilter[0]]) {
                    var convertWord = wordFilter.length === 2 ? this.setFilter(data[wordFilter[0]], wordFilter[1]) : data[wordFilter[0]];
                    outhtml = outhtml.replace(e, (typeof data[wordFilter[0]] !== 'object' ? data[wordFilter[0]] : this.setErrorForObject(e)));
                }
                else {
                    this.setError('# element no exist');
                    return console.error(new Error('error element ' + word + ' not exist in data'));
                }
            }.bind(this));
            result.textContent = outhtml;
        }
    };
    
    return Lombia;
})();