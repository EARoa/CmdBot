/* ************************************************************************

    Licence : LGPLv3

    Version: 0.1

    Authors: deisss

    Date: 2012-08-04

    Date of last modification: 2012-08-04

    Description: Basic memory system to get data from it

************************************************************************ */
/**
 * Basic memory system to get data from it
*/
var singleton = function singleton(){
    var content = {};

    /**
     * Set (and replace if needed) a data to store
     * @param string key The key reference to store data
     * @param mixed data The data to store into this system
     * @param integer expire The number of milliseconds before deleting from store
    */
    this.set = function(key, data, expire){
        //First deleting the content if there is (this force to stop previous timeout)
        this.remove(key);

        //Appending the content to the room, or replace one if there is
        content[key] = {
            data : data
        };
    };

    /**
     * Return a data stored, or null if there is nothing
     * @param string key The key to store data
     * @return mixed The founded data, or null if there is an error
    */
    this.get = function(key){
        if(typeof(content[key]) !== "undefined" && content[key] !== null &&
            typeof(content[key].data) !== "undefined" && content[key].data !== null
        ){
            return content[key].data;
        }
        return null;
    };

    /**
     * Delete the stored key if it is existing
     * @param string key The key to delete associated data
    */
    this.remove = function(key){
        if(typeof(content[key]) !== "undefined" && content[key] !== null){
            //Deleting the content
            delete content[key];
        }
    };

    /**
     * Get back the full content array
     * @return array The full content
    */
    this.getStoreContent = function(){
        //Return the full store
        return content;
    };

    //Disable the ability to call the singleton without using the getInstance function
    if(singleton.caller != singleton.getInstance){
        throw new Error("This object cannot be instanciated");
    }
}

/* ************************************************************************
SINGLETON CLASS DEFINITION
************************************************************************ */
singleton.instance = null;


/**
 * Singleton getInstance definition
 * @return singleton class
 */
singleton.getInstance = function(){
    if(this.instance === null){
        this.instance = new singleton();
    }
    return this.instance;
}

module.exports = singleton.getInstance();