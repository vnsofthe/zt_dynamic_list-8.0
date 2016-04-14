/*---------------------------------------------------------
 * Edit for vnsoft(QQ:9181720)
 *---------------------------------------------------------*/
openerp.st_dynamic_list=function(instance) {
    var QWeb = instance.web.qweb;
    instance.web.ListView.include({
        load_list: function (data) {
           var self = this;
           this._super.apply(this,arguments);
           this.setup_columns(this.fields_view.fields, this.grouped);
           this.$buttons.find('.oe_select_columns').click(this.proxy('my_setup_columns'));
           this.$buttons.find('.oe_dropdown_btn').click(this.proxy('hide_show_columns'));
           this.$buttons.find('.oe_dropdown_menu').click(this.proxy('stop_event'));
        },

        my_setup_columns: function (fields, grouped) {
                    $("#showcb").show();
                    var getcb = document.getElementById('showcb');

                    this.visible_columns = _.filter(this.columns, function (column) {
                    var firstcheck = document.getElementById(column.id);
                    if(firstcheck == null)
                    {
                        var li= document.createElement("li");
                        var description = document.createTextNode(column.string);
                        var checkbox = document.createElement("input");
                        checkbox.id = column.id;
                        checkbox.type = "checkbox";
                        checkbox.name = "cb";

                        if(column.invisible !== '1')
                        {
                         checkbox.checked = true;
                        }
                        li.appendChild(checkbox);
                        li.appendChild(description);
                        getcb.appendChild(li);
                    }
                    else
                    {
                        if(column.invisible !== '1')
                        {
                         firstcheck.checked = true;
                        }
                        else
                        {
                          firstcheck.checked = false;
                        }
                    }
            });
        },
        stop_event : function(e)
          {
              e.stopPropagation();
          },

        hide_show_columns : function()
        {
            var self=this;
           $("#showcb").hide();
           this.setup_columns(this.fields_view.fields, this.grouped);
           this.$el.html(QWeb.render(this._template, this));

            $(this.el).find('.oe_list_record_selector').click(function(){
                self.$el.find('.oe_list_record_selector input').prop('checked',
                    self.$el.find('.oe_list_record_selector').prop('checked')  || false);
                var selection = self.groups.get_selection();
                $(self.groups).trigger(
                    'selected', [selection.ids, selection.records]);
            });
           this.reload();
            $(self.groups).trigger(
                    'selected', [[], []]);
        },

        setup_columns: function (fields, grouped) {
            this._super.apply(this, arguments);

            this.visible_columns = _.filter(this.columns, function (column) {
            var cbid = document.getElementById(column.id);
            if(cbid !== null)
            {
              var cbid = cbid.checked;
              if(cbid !== false)
                {
                    column.invisible = '2';
                }
                else
                {
                    column.invisible = '1';
                }
            }
              return column.invisible !== '1';
            });

            this.aggregate_columns = _(this.visible_columns).invoke('to_aggregate');
        }
    });

    $(document).click(function(){
      $("#showcb").hide();
    });

}
