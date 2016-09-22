"use strict";

class PackageManager {

    constructor(panel, base_path) {
        this.base_path = base_path;
        this.panel   = panel;
        this.bundles = {};
    }

    addBundleInfo(pkg_info) {

        var div  = document.createElement('div');
        var dsel = d3.select(div);

        dsel.data([pkg_info]);

        dsel.append('img')
            .attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXlJREFUeNqsVMtNw0AQXa8oACogqQDnjkRSAckJiVPcQVxBQgUmFcQnJE52Bw4Sd9IBLsEdwJvobTRYu5Yd8qTR2ruzb747kQng/uktxjKH3EGuIR+Q/ef7894MQOQhFrIdyX0QAykMHfoYsB7yiuQ1JIGMITeQBcmnosMIh0WAS+L5EpLTy8YT4QbLmg7U3JZottCvgwZwcYTlm5cmPnKlWwRSmOBeHkqRu7DtIidelJRqf0dHT7hS37cq3E6wwIdWx1XstgL/qes2SwXJ+6qLFDo/TgIGU/7GbILl0QBDkuJKWhZD+1wZyVtbmXBbdo1h15Tmf5iwtRumay41eAh4cE4Ux9rA85o1ebStR3YR6DRb1Q2rSxmAs1PXkZF6YK6/Sz1ncC6GswDXn4dF4hH1JSPjiAdZIALpqlKNEI0cZwnO5IEWvseI803U8nRNyw6nsYHzioPOcGzPWLcveu3QkPzVO6478uomrWDWY5ycVby475h2+BVgAMTmosbxSQXaAAAAAElFTkSuQmCC')
            .on('click', () => { this.startPackageDownload(); });

        dsel.append('span')
            .text(d => d.desc);

        this.panel.appendChild(div);

        var desc = pkg_info.desc;
        var pkgs = pkg_info.pkgs;
        var no_files = 0;

        for(var i = 0; i < pkgs.length; i++)
            no_files += pkgs[i].no_files;

        pkg_info.loaded = 0;
        pkg_info.total  = no_files;

        this.bundles[desc] = { div: div, info: pkg_info };

    }

    // XXX [EG]: This needs to be tweaked, package loading could be
    // externally initiated.
    startPackageDownload() {

        var row = d3.select(d3.event.target.parentNode);
        jsCoq.add_pkg(row.datum().desc);

    }

    // In all the three cases below, evt = progressInfo
    // bundle_name_    : string
    // method pkg_name : string
    // method loaded   : int
    // method total    : int

    onBundleStart(bundle_info) {

        var bundle_name = bundle_info.desc;

        var div  = this.bundles[bundle_name].div;
        // var row  = d3.select(this.panel).selectAll('div')
        //     .filter(pkg => pkg.desc === evt.bundle_name);

        // XXX: Workaround, in case this is called multiple times, add
        // the bar only the first time. We could be smarter.

        if (! this.bundles[bundle_name].bar ) {

            var row  = d3.select(div);

            var bar = row.append('div')
                .attr('class', 'rel-pos')
                .append('div')
                .attr('class', 'progressbar');

            var egg = bar
                .append('img')
                .attr('src', 'data:image/png;base64,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')
                .attr('class', 'progress-egg');

            this.bundles[bundle_name].bar = bar;
            this.bundles[bundle_name].egg = egg;
        }
    }


    onPkgProgress(evt) {

        var info = this.bundles[evt.bundle_name].info;
        var bar  = this.bundles[evt.bundle_name].bar;
        var egg  = this.bundles[evt.bundle_name].egg;

        var progress = ++info.loaded / info.total;
        var angle    = (progress * 360 * 15) % 360;
        egg.style('transform', 'rotate(' + angle + 'deg)');
        bar.style('width', progress * 100 + '%');
    }

    onBundleLoad(bundle_info) {

        var bundle_name = bundle_info.desc;
        var info = this.bundles[bundle_name].info;
        var div  = this.bundles[bundle_name].div;
        var row  = d3.select(div);

        row.select('.rel-pos').remove();
            row.select('img')
                .attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWVJREFUeNqcVUFOwzAQbKreyQ8IPwh3DuEH4VSJC8kLSl8AvIDygpYLEqf2CUXi3vACyg/yA5hFY7QyXruppe3W9u7Mrr3rZKPEuJi+VFAzSO1t7SEP76/Xq5j/JAKcQ60hlWHSQzapADMDvIDaQXIuLSDPiLbTAWDeq/kS6s3PyCIQ8BIigK0GNuwFvGFWZ5p4EjC+J7gYXcF4PwD8UoPLGAd8ZtTzI8D/ZToOVIyce+/OkvdxFHgog5J6QxCZ7wg2GDxE4Krmi7rgWuNIhoBbdyDjRH7gLJm0XBOSzxg49r9FYgRb6r/m4l20KiML3HV6ZxLAaUuAUl+uIokdy40XpHlErv2XHvmKTdQFKqpWb9VTimDOSCu/evwmUpXm7BZ+71hPRc2HzmUUbDrY3UI9urOHzflBjx2dGzrniuiD/09ZCIXaa0MZZomnQADuWJqhkfwmZKMDBol0xL9Rp5pMxo8AAwCkiLHqeAxSJAAAAABJRU5ErkJggg==');
    }
}

// EG: This will be useful once we move file downloading to javascript.
// PackagesManager

class PackageDowloader {

    constructor(row, panel) {
        this.row = row;
        this.bar = null;
        this.egg = null;
        this.bundle_name = row.datum().desc;
        this.panel = panel;
        this.progress = 0; // percent
    }

    // This method setups the download handling.
    download() {

        // Allow re-download
        // this.row.select('img').on('click', null);

        this.bar = this.row.append('div')
            .attr('class', 'rel-pos')
            .append('div')
            .attr('class', 'progressbar');

        this.egg = this.bar
            .append('img')
            .attr('src', 'data:image/png;base64,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')
            .attr('class', 'progress-egg');

        var files_total_length = 0;
        var files_loaded_cpt = 0;
        var pkgs = this.row.datum().pkgs;

        // Proceed to the main download.
        for(var i = 0; i < pkgs.length; i++)
            files_total_length += pkgs[i].no_files;

        document.body.addEventListener('pkgProgress',
            (evt) => {
                if(evt.detail.bundle_name === this.bundle_name) {
                    this.progress = ++files_loaded_cpt / files_total_length;
                    this.updateProgress();
                    if (files_loaded_cpt === files_total_length)
                        this.finishDownload();
                }
            }
        );

        jsCoq.add_pkg(this.bundle_name);

    }

    updateProgress() {
        var angle = (this.progress * 360 * 15) % 360;
        this.egg.style('transform', 'rotate(' + angle + 'deg)');
        this.bar.style('width', this.progress * 100 + '%');
    }

    finishDownload() {
        this.row.select('.rel-pos').remove();
        this.row.select('img')
            .attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAASCAYAAABB7B6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWVJREFUeNqcVUFOwzAQbKreyQ8IPwh3DuEH4VSJC8kLSl8AvIDygpYLEqf2CUXi3vACyg/yA5hFY7QyXruppe3W9u7Mrr3rZKPEuJi+VFAzSO1t7SEP76/Xq5j/JAKcQ60hlWHSQzapADMDvIDaQXIuLSDPiLbTAWDeq/kS6s3PyCIQ8BIigK0GNuwFvGFWZ5p4EjC+J7gYXcF4PwD8UoPLGAd8ZtTzI8D/ZToOVIyce+/OkvdxFHgog5J6QxCZ7wg2GDxE4Krmi7rgWuNIhoBbdyDjRH7gLJm0XBOSzxg49r9FYgRb6r/m4l20KiML3HV6ZxLAaUuAUl+uIokdy40XpHlErv2XHvmKTdQFKqpWb9VTimDOSCu/evwmUpXm7BZ+71hPRc2HzmUUbDrY3UI9urOHzflBjx2dGzrniuiD/09ZCIXaa0MZZomnQADuWJqhkfwmZKMDBol0xL9Rp5pMxo8AAwCkiLHqeAxSJAAAAABJRU5ErkJggg==');
    }
}

// Local Variables:
// js-indent-level: 4
// End:
