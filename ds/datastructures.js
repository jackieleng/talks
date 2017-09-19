class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}


class SinglyLinkedList {
  constructor() {
    this.first = null;
  }

  append(data) {
    var newNode = new Node(data);
    if (!this.first) {
      this.first = newNode;
    } else {
      var current = this.first;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  insert(data) {
    var newNode = new Node(data);
    newNode.next = this.first;
    this.first = newNode;
  }

  /*
   * 0-based indexing
   */
  getNode(index) {
    if (index < 0 || index > this.length() - 1) {
      throw new Error("Index out of bounds.");
    }
    var current = this.first;
    for (var i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  get(index) {
    return this.getNode(index).data;
  }

  length() {
    var count = 0
    var current = this.first;
    while (current) {
      current = current.next;
      count++;
    }
    return count;
  }

  remove(index) {
    if (index === 0) {
      var toRemove = this.getNode(index);
      this.first = toRemove.next;
    } else {
      var prev = this.getNode(index - 1);
      var toRemove = prev.next;
      prev.next = toRemove.next;
    }
    return toRemove.data;
  }
}


class Queue {
  constructor() {
    this.list = new SinglyLinkedList();
  }

  enqueue(data) {
    this.list.append(data);
  }

  dequeue() {
    return this.list.remove(0);
  }
}


class Stack {
  constructor() {
    this.list = new SinglyLinkedList();
  }

  push(data) {
    this.list.insert(data);
  }

  pop() {
    return this.list.remove(0);
  }
}


/*
 * Hash functions
 */
function crappyHash(value, size) {
  return value.length % size;
}


function betterHash(value, size) {
  var temp = 0;
  for (var i = 0; i < value.length; i++) {
    temp += value.charCodeAt(i) ** (i + 1);
  }
  return temp % size;
}


/*
 * HashTable entry.
 */
class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}


class HashTable {
  constructor() {
    this.size = 11;
    // JS doesn't actually allocate array size though...
    this.buckets = new Array(this.size);
    // Init with empty lists
    for (var i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
  }

  set(key, value) {
    var index = betterHash(key, this.size);
    var entries = this.buckets[index];
    // Check if already added, if so, update the value
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].key === key) {
        entries[i].value = value;
        return;
      }
    }
    // otherwise: create a new Entry
    var entry = new Entry(key, value);
    entries.push(entry);
  }

  get(key) {
    var index = betterHash(key, this.size);
    var entries = this.buckets[index];
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].key === key) {
        return entries[i].value;
      }
    }
    throw new Error("Unknown key.");
  }
}
