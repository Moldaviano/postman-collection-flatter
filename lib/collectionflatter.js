const fs = require('fs');

function flattenAndRename(collection) {
  // Rename all requests
  function renameRequests(items) {
    items.forEach(item => {
      if (item.request) {
        const method = item.request.method;
        const path = item.request.url.path ? item.request.url.path.join('/') : '';
        item.name = `${method} /${path}`;
      } else if (item.item) {
        renameRequests(item.item);
      }
    });
  }
  
  renameRequests(collection.item);
  
  // Poi appiattisce la struttura a 2 livelli
  const newItems = [];
  
  function processItem(item, parentName = '') {
    if (item.item && item.item.length > 0) {
      item.item.forEach(child => {
        const newParentName = parentName ? parentName : item.name;
        processItem(child, newParentName);
      });
    } else if (item.request) {
      let folder = newItems.find(f => f.name === parentName);
      if (!folder && parentName) {
        folder = { name: parentName, item: [] };
        newItems.push(folder);
      }
      
      if (folder) {
        folder.item.push(item);
      } else {
        newItems.push(item);
      }
    }
  }
  
  collection.item.forEach(item => processItem(item));
  collection.item = newItems;
  return collection;
}

module.exports = flattenAndRename;