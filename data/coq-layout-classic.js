// The CoqLayoutClassic class.
// (c) 2015-2016 Mines ParisTech/ARMINES
//
// This class provides a plugabble side panel with proof and query
// buffers.

var COQ_LOG_LEVELS = {
    DEBUG : 'debug',
    INFO  : 'info',
    WARN  : 'warn',
    ERROR : 'error'
};

/***********************************************************************/
/* The CoqLayout class contains the goal, query, and packages buffer   */
/***********************************************************************/
class CoqLayoutClassic {

    html(base_path) {
        var html = `
    <div id="toolbar">
      <div style="position:relative; left:-34px; top:2px">
      <div style="position:absolute">
      </div>
      </div>
      <div class="exits">
        <a href="http://feever.fr/" target="_blank">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAkCAIAAABdWRDGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABOBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wUmlnaHRzOk1hcmtlZD0iVHJ1ZSIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LW5jLW5kLzQuMC9kZWVkLmZyIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6RkI3RjExNzQwNzIwNjgxMTgyMkFFQTJFMzk5NkMxNDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTgzNDkxNTI2NDYyMTFFNUJGM0E5QTQyOTQyM0NBMzIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTgzNDkxNTE2NDYyMTFFNUJGM0E5QTQyOTQyM0NBMzIi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" alt="FEEVER Logo" height="34" width="67"
               style="vertical-align: middle"/>
        </a>
        <a href="https://github.com/ejgallego/jscoq">Readme @ GitHub</a>
      </div> <!-- /#exits -->
      <span id="buttons">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpiZiACyOaZCfCbSx8H4p+fTj69QEg9MzEGAqn9QGwAxAFAgx8SMpiZBANhgKDBzCQaSJTBzGQYSNBgZjINxGswMwUG4jSYmUIDsRrMTAUDMQxmpJKByCCREU+S+k9I9+NJp7DqZ2KgARg1dNTQUUNHpqEAAQYAPj1DLPCI+JEAAAAASUVORK5CYII=" width="21" height="24"
             alt="Up (Meta-P)" title="Up (Meta-P)" name="up"/>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAZCAYAAADe1WXtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJJJREFUeNpiZMABZPPM/jMQAI8nnWLEJs7EQAMwauiooaOGjkxDGYGlkQGQ3g/EAlQw7wIQOzJCizlqGAw2EFgcfmBEKj8pMRhuINj7aAUzOQajGIhhKBkGYxiI1VASDMZqIE5DiTAYp4F4DcVjMF4DCRqKxWCCBoIAMyFDP518+oLfXHonkKkBxJ6EDKQZAAgwALdtPzuuLNPEAAAAAElFTkSuQmCC" width="21" height="25"
             alt="Down (Meta-N)" title="Down (Meta-N)" name="down"/>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAORJREFUeNrslt0RwiAMgCnHJC7ho6vUAZzGAWAdl3CVGjx753km5JcHzzw2Tfn4gJSU/vEjsWCJw+W43q+3NvoAvLd9ew61C6MWHSMTdbUXRhl5fbti+TKo73CJMreb2c1xTVFQI2Mh5jhQXDA3OC6UBMwMJ4F67jHsVGn3nBQKGz8rJi8yJzVlAWPDaaEsYEM4C5QVrMdJmQsFa3AIzkTj7bk2G4yE8oDLUVBWuIL925D+IoJ6h+v9D2Ll3kJylCmruTwDSgNXrFCfSz66/lDLKjHmYsq1lcCsagqOGWO4x0OAAQASlX7FMm0/EgAAAABJRU5ErkJggg==" width="38" height="24"
             alt="To cursor (Meta-Enter)" title="To cursor (Meta-Enter)" name="to-cursor"/>
      </span>
    </div> <!-- /#toolbar -->
    <div class="flex-container">
      <div id="goal-panel" class="flex-panel">
        <div class="caption">Goals</div>
        <div class="content" id="goal-text" data-lang="coq">
        </div>
      </div>
      <div class="msg-area flex-panel">
        <div class="caption">
          Messages
          <select name="msg_filter">
            <option value="3">error</option>
            <option value="2">warn</option>
            <option value="1" selected="selected">info</option>
            <option value="0">debug</option>
          </select>
        </div>
        <div class="content" id="query-panel"></div>
      </div>
      <div class="flex-panel collapsed">
        <div class="caption">Packages</div>
        <div id="packages-panel" class="content"></div>
      </div>
    </div>`

        return html;
    }

    // Reference to the jsCoq object.
    constructor(options) {

        // Our reference to the IDE, goal display & query buffer.
        this.ide   = document.getElementById(options.wrapper_id);

        this.panel = document.createElement('div');
        this.panel.id = 'panel-wrapper';
        this.panel.innerHTML = this.html(options.base_path);

        this.ide.appendChild(this.panel);

        // UI setup.
        this.proof    = document.getElementById('goal-text');
        this.query    = document.getElementById('query-panel');
        this.packages = document.getElementById('packages-panel')
        this.buttons  = document.getElementById('buttons');

        // XXXXXXX: This has to be fixed.
        this.log_css_rules = document.getElementById("coq-log").sheet.cssRules;

        var flex_container = this.panel.getElementsByClassName('flex-container')[0];
        flex_container.addEventListener('click', evt => { this.panelClickHandler(evt); });

        d3.select('select[name=msg_filter]')
            .on('change', () => this.filterLog(d3.event.target));
    }

    adjustWidth() {

        setTimeout(() => {

            // Set Printing Width... Far from perfect (XXX: Update on resize)
            var pxSize  = parseFloat(getComputedStyle(this.query)['font-size']);

            // A correction of almost 2.0 is needed here ... !!!
            var emWidth = Math.floor(this.query.offsetWidth / pxSize * 1.65);
            console.log("Setting printing width to: " + emWidth );

            // XXX: What if the panel is toogled from the start...!
            // Shoud send a message.
            this.coq.set_printing_width(emWidth);
        }, 500);
    }

    show() {
        this.ide.classList.remove('toggled');
        // XXX: This will fail if coq is not loaded...
        this.adjustWidth();
    }

    hide() {
        this.ide.classList.add('toggled');
    }

    toggled() {
        return this.ide.classList.contains('toggled');
    }

    toggle() {

        if (this.toggled()) {
            this.show();
        }
        else {
            this.hide();
        }
    }


    // This is still not optimal.
    update_goals(str) {
        // TODO: Add diff/history of goals.
        // XXX: should send a message.
        this.proof.textContent = str;
    }

    // Add a log event received from Coq.
    log(text, level) {

        d3.select(this.query)
            .append('div')
            .attr('class', level)
            .html(text);
            // .node()
            // .scrollIntoView();

        if (!this.scrollTimeout) {
            this.scrollTimeout = setTimeout( () => {
                this.query.scrollIntoView(false);
                this.scrollTimeout = null;
            }, 400 );
        }
    }

    filterLog(level_select) {

        // debugger;
        var length = level_select.getElementsByTagName('option').length;
        var min_log_level = parseInt(level_select.value, 10);
        var i;
        // XXXX!
        for(i=0 ; i < min_log_level ; i++)
            this.log_css_rules[i].style.display = 'none';
        for(i=min_log_level ; i < length ; i++)
            this.log_css_rules[i].style.display = 'block';
    }

    // Execute a query to Coq
    query(query) {
        return true;
    }

    panelClickHandler(evt) {

        var target = evt.target;

        if(target.classList.contains('caption') &&

            target.parentNode.classList.contains('flex-panel')) {

            var panel = target.parentNode;

            if(panel.classList.contains('collapsed')) {

                panel.classList.remove('collapsed');

            } else {

                var panels_cpt = this.panel.getElementsByClassName('flex-panel').length;
                var collapsed_panels_cpt = this.panel.getElementsByClassName('collapsed').length;

                if(collapsed_panels_cpt + 1 >= panels_cpt) // at least one panel opened
                    return;

                panel.classList.add('collapsed');
            }
        }
    }
}

// Local Variables:
// js-indent-level: 4
// End:
