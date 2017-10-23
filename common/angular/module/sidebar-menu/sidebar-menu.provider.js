function $sidebarMenu() {

  this.defaults = {
    items: []
  };

  this.$get = SidebarMenuFactory;
}

function SidebarMenuFactory() {

  var provider = this;

  return {
    getItems: function () {
      return provider.defaults.items;
    },
    getIndexItem: function(item){
      return provider.defaults.items.indexOf(item);
    },
    addItem: function (item) {
      provider.defaults.items.push(item)
    },
    addItems: function (items) {
      provider.defaults.items = provider.defaults.items.concat(items);
    },
    removeAll: function () {
      provider.defaults.items = [];
    },
    addChildToItem: function (index, child) {
      if(!provider.defaults.items[index].child) {
        provider.defaults.items[index].child = [];
      }

      provider.defaults.items[index].child.push(child);
    },
    removeChildren: function(index) {
      provider.defaults.items[index].child = [];
    }
  }

}

export default $sidebarMenu;