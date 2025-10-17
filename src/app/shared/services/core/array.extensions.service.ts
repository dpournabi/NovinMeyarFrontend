
export { };
declare global {
    interface Array<T> {
        removeTree(this: Array<any>, key: any, keyName: string, childrenName: string): void;
        findTree(this: Array<any>, key: any, keyName: string, childrenName: string): any;
        mapTree(this: Array<any>, childrenName: string, mappedChildrenName: string, mapAction: Function);
        searchTree(this: Array<any>, searchFunc: Function, childrenName: string): any;
    }
}
Array.prototype.removeTree = function (key: any, keyName: string, childrenName: string) {
    let index = -1;
    for (let i = 0; i < this.length; i++) {
        const item = this[i];
        if (item[keyName] == key) {
            index = i;
            this.splice(index, 1);
            return;
        }
        else if(item[childrenName] != undefined && item[childrenName] != null) {
            (item[childrenName] as Array<any>).removeTree(key, keyName, childrenName);
        }
    }
}
Array.prototype.findTree = function (key: any, keyName: string, childrenName: string) {
    for (const item of this) {
        if (item[keyName] == key) {
            return item;
        }
        else if(item[childrenName] != undefined && item[childrenName] != null) {
            let result = (item[childrenName] as Array<any>).findTree(key, keyName, childrenName);
            if (!result) {
                ///..............do nothing
            }
            else {
                return result;
            }
        }
    }
    return null;
}
Array.prototype.mapTree = function (childrenName: string, mappedChildrenName: string, mapAction: Function) {
    let mappedTree = [];
    for (const t of this) {
        let mappedData = mapAction(t);
        mappedTree.push(mappedData);

        if (t[childrenName] && t[childrenName].length > 0) {
            mappedData[mappedChildrenName] = (t[childrenName] as Array<any>).mapTree(childrenName, mappedChildrenName, mapAction);
        }
    }

    return mappedTree;
}
Array.prototype.searchTree = function (searchFunc: Function, childrenName: string) {
    let result: Array<any> = [];
    for (const item of this) {
        if (searchFunc(item)) {
            result.push(item);
        }
        else if(item[childrenName] != undefined && item[childrenName] != null) {
            let childResult = (item[childrenName] as Array<any>).searchTree(searchFunc, childrenName);
            if (!childResult) {
                //do nothing
            }
            else {
                result.push(childResult);
            }
        }
    }
    return result;
}