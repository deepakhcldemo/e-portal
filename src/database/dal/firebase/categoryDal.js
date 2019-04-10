import dbFactory from '../../dbFactory';

export const getCategoryFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    db.firestore().collection("category").doc('0').get()
        .then(function(doc) {
            if (doc.exists) {                
                dispatch({type:'GET_CATEGORY', category: [doc.data()]})
            } 
    }).catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}

export const manageCategoryFromDB = async (dispatch, tree, state, type) => {
    const db = dbFactory.create('firebase');    
    const treeData = await manageTree(tree, state, type);
    console.log(treeData);
    db.firestore().collection('category').doc('0').set(treeData[0])
    .then((res)=>{
        console.log(res)
        dispatch({type: 'ADD_CATEGORY', category: treeData})          
    }).catch(err => {
        dispatch({type: 'ERROR', err})
    })
}

const manageTree = (tree, state, type) => {    
    if (state.selectedNodeIndex.length === 1){
        tree[0].items.push({text: state.selectedNode, items: []})
        return tree
    }
    manageNestedTree(tree,state,type);   
    return tree;
}

const manageNestedTree = (tree, state, type) => {
    let clonedTree = tree;
    const itemHierarchicalIndex = splitItemHierarchicalIndex(state.selectedNodeIndex),
    len = itemHierarchicalIndex.length;
    for(let i = 0;i<len;i++){
        if(i === len-1 && (type == 'edit' || type == 'delete')) {
            if(type == 'edit') {
                clonedTree = clonedTree[itemHierarchicalIndex[i]]
            } else if(type == 'delete'){
                delete clonedTree[itemHierarchicalIndex[i]]
            }
        }else {
            clonedTree = clonedTree[itemHierarchicalIndex[i]].items
        }
    }
    if(type.toUpperCase() === 'ADD') {
        clonedTree.push({text: state.selectedNode, items: []})            
    }else if(type.toUpperCase() === 'EDIT') {
        clonedTree.text = state.selectedNode
    }
    return tree;
}

const splitItemHierarchicalIndex = (itemHierarchicalIndex) => {
    return itemHierarchicalIndex.split('_');
}
