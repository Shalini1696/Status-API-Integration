import { LightningElement, track } from 'lwc';

export default class MaintenanceDetails extends LightningElement {

    isButtonClicked = false;
    isTileClicked = false;
    @track maintList = [];
    @track selecteditem = {};

    buttonClickHandler(event) {
        const endpoint = `https://api.status.salesforce.com/v1/instances/AP16/status`;        
        this.fetchMaintenanceDetails(endpoint);        
    }
    
    tileClickHandler(event){
        this.isTileClicked = true;   
        for(let item in this.maintList){
            if(this.maintList[item].id == event.target.label){                    
                this.selecteditem.id = this.maintList[item].id;
                this.selecteditem.name = this.maintList[item].name;                
                this.selecteditem.additionalInformation = this.maintList[item].additionalInformation;                
                this.selecteditem.maintenanceType = this.maintList[item].maintenanceType;   
            }         
        }        
    }

    async fetchMaintenanceDetails(endpoint) {
        const maintStatusDT = await fetch(endpoint);
        const maintDTjson = await maintStatusDT.json();
        this.isButtonClicked = true;       
        for(const maint of maintDTjson.Maintenances){
            const maintenances = {};
            maintenances.id = maint.id;
            maintenances.name = maint.name;
            maintenances.additionalInformation = maint.additionalInformation;            
            maintenances.maintenanceType = maint.message.maintenanceType;            
            this.maintList.push(maintenances);                 
        }       
    }
}