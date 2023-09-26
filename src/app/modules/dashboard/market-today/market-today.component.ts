import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILoadedEventArgs, ChartTheme, IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import {BarServiceService} from 'src/services/bar-service.service'


declare var jQuery: any;

@Component({
  selector: 'app-market-today',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './market-today.component.html',
  styleUrls: ['./market-today.component.scss'],
  
})
export class MarketTodayComponent implements OnInit{
    uploadForm: FormGroup;
    months: String[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct',' Nov', 'Dec'];
    public categoryItems:String[]=[];
    public multiSelectorData:any=[];
    height: any =0;
    heightNew:any ='100';
    columnWidth : number = 0.01;
    marketDataStore:any=[];
    selected:any;
    graphData:any=[];
    nameOntoolTip:string;
    
    public bgStyle:any = {
        border: '1px solid rgb(216, 214, 214)',
        //height :"ghkj"
    }

    public stylesImg:any = {
        width:"64px",
        'margin-left':'20px', 
        'border-radius': '34px', 
        'padding': '6px 6px'
        
    }
    prYAxis:Object={
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        minimum: 0, maximum: 500, interval: 50,
        labelFormat: '${value} M'
    }
    fileSelected:File;
    public years:any=[];
    prXAxis:Object={
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    }
    
    public chartData1:Array<any>=[{x:'Jan',y:200},{x:'Feb',y:270},{x:'Mar',y:380},{x:'Apr',y:400},{x:'May',y:350},{x:'Jun',y:100},{x:'Jul',y:290},{x:'Aug',y:310},{x:'Sep',y:100},{x:'Oct',y:420},{x:'Nov',y:160},{x:'Dec',y:260}]
    public category: String[] = [
        'ALTERATIONS MENDING SEAMSTRESSES TAILORS',
        'ANTIQUE REPRODUCTIONS',
        'ARCHITECTURAL ENGINEERING AND SURVEYING SERVICES',
        'ART DEALERS AND GALLERIES',
        'AUTOMOTIVE PARTS AND ACCESSORIES STORES',
        'Automotive & Car Care', 
        'Appliances & Kitchenware',
        'BAKERIES',
        'BANDS ORCHESTRAS AND MISCELLANEOUS ENTERTAINERS',
        'BARBER AND BEAUTY SHOPS',
        'BOOKS PERIODICALS AND NEWSPAPERS',
        'Baby Care',
        'Bakery', 
        'Beverages', 
        'CANDY NUT AND CONFECTIONERY STORES',
        'CAR AND TRUCK DEALERS NEW AND USED SALES SERVICES',
        'CATERERS',
        'COLLEGES UNIVERSITIES PROFESSIONAL SCHOOLS',
        'COMMERCIAL FOOTWEAR',
        'COMPUTER MAINTENANCE AND REPAIR SERVICES',
        'COMPUTER NETWORK AND INFORMATION SERVICES',
        'COMPUTERS COMPUTER PERIPHERAL EQUIPMENT SOFTWARE',
        'CORRESPONDENCE SCHOOLS',
        'COSMETIC STORES',
        'COURIER SERVICES AIR OR GROUND AND FREIGHT FORWARD',
        'Cans & Jars', 
        'Cereals & Spreads & Honey', 
        'Chocolate & Snacks', 
        'Coffee',
        'Computers & IT Accessories',
        'DANCE HALLS STUDIOS AND SCHOOLS',
        'DEPARTMENT STORES',
        'DRAPERY WINDOW COVERING AND UPHOLSTERY STORES',
        'DRUG STORES AND PHARMACIES',
        'Dairy & Eggs', 
        'Dessert',
        'ELECTRICAL CONTRACTORS',
        'ELECTRONIC SALES',
        'ELECTRONICS REPAIR SHOPS',
        'Electronics',
        'FAST FOOD RESTAURANTS',
        'FINANCIAL INSTITUTIONS MANUAL CASH DISBURSEMENTS',
        'FINANCIAL INSTITUTIONS MERCHANDISE AND SERVICES',
        'FLORISTS SUPPLIES NURSERY STOCK AND FLOWERS',
        'FREEZER AND LOCKER MEAT PROVISIONERS',
        'FUEL DEALERS FUEL OIL WOOD COAL AND LIQUEFIED',
        'Flowers',
        'Frozen Fries', 
        'Fruits & Vegetables', 
        'Furniture Home Furnishings and Equipment Stores',
        'Furniture',
        'GROCERY STORES AND SUPERMARKETS',
        'Garden Tools',
        'HARDWARE STORES',
        'HEALTH AND BEAUTY SPAS',
        'HHGFHFH',
        'HOME SUPPLY WAREHOUSE STORES',
        'HOSPITALS',
        'HOUSEHOLD APPLIANCE STORES',
        'Healthy & Beauty',
        'Healthy & Organic',
        'Hobbies & Leisure',
        'Home Bake & Sugar', 
        'Hot Drinks',
        'House Hold',
        'Household Chemicals',
        'IceCream',
        'JEWELRY',
        'JWELLER',
        'Jewelry & Accessories',
        'Kids Toys',
        'Lodging Hotels Motels and Resorts',
        'MANAGEMENT CONSULTING AND PUBLIC RELATIONS SERVICE',
        'MASONRY STONEWORK TILE SETTING PLASTERING',
        'MEDICAL SERVICES AND HEALTH PRACTITIONERS',
        'MEMBERSHIP CLUBS SPORTS RECREATION ATHLETIC',
        'MEN AND BOYS CLOTHING AND ACCESSORIES STORES',
        'MENS WOMENS AND CHILDRENS UNIFORMS GARMENTS',
        'METAL SERVICE CENTERS AND OFFICES',
        'MISCELLANEOUS APPAREL AND ACCESSORY STORES',
        'MISCELLANEOUS FOOD STORES',
        'MISCELLANEOUS HOME FURNISHING SPECIALTY STORES',
        'MOBILE HOME DEALERS',
        'MOTOR FREIGHT CARRIERS AND TRUCKING LOCAL AND LONG',
        'MOTOR VEHICLE SUPPLIES AND NEW PARTS',
        'MOTORCYCLE SHOPS AND DEALERS',
        'MUSIC STORES MUSICAL INSTRUMENTS PIANOS',
        'Meat & Poultry & Fish', 
        'Mens Fashion',
        'OFFICE AND COMMERCIAL FURNITURE',
        'OPTICIANS OPTICAL GOODS AND EYEGLASSES',
        'ORTHOPEDIC GOODS AND PROSTHETIC DEVICES',
        'OTHER',
        'Oil & Spices & Sauces',
        'PACKAGE STORES BEER WINE AND LIQUOR',
        'PHOTOGRAPHIC STUDIOS',
        'Pets',
        'Pharmacy',
        'REPAIR SHOPS ELECTRICAL AND SMALL APPLIANCES',
        'Rice & Pasta & Pulses',
        'SCHOOLS AND EDUCATIONAL SERVICES',
        'STATIONERY OFFICE SUPPLIES AND PRINTING AND WRITIG',
        'Shoes',
        'TAX PAYMENTS',
        'TELECOMMUNICATIONS EQUIPMENT AND TELEPHONE SALES',
        'TENT AND AWNING SHOPS',
        'TIRE RETREADING AND REPAIR SHOPS',
        'TRAVEL AGENCIES AND TOUR OPERATORS',
        'Tableware & Kitchenware',
        'UTILITIES ELECTRIC GAS WATER AND SANITARY',
        'VARIETY STORES',
        'WOMENS ACCESSORY AND SPECIALTY SHOPS',
        'Women\s Fashion',
    ];
    data1: Object[];
    data2: Object[];
    data3: Object[];
    catData:Object[];
    palette: String[];
    imageUrl: any;
    dropdownSettings: { 
        singleSelection: boolean; idField: string; textField: string; selectAllText: string; unSelectAllText: string; itemsShowLimit: number; allowSearchFilter: boolean; clearSearchFilter:boolean,enableCheckAll:boolean,searchPlaceholderText:string,
        limitSelection:Number
    };
    constructor(public fb: FormBuilder,private bar_Service:BarServiceService) { 
        this.uploadForm = this.fb.group({
            avatar: [null],
            name: [""]
        })
    }

    ngOnInit(): void {
        const year:any = new Date().getFullYear();
        this.years.push(year);
        for(var i=1; i<3;i++){
            this.years.push(year + i);
        }
    
        this.data1 = this.chartData1.map(item => {
        return {x: item.x, y: item.y}
        });

        // this.data2 = this.months.map(item => {
        // let num  = this.randomIntFromInterval(150, 400);
        // return {x: item, y: num}
        // });

        // this.data3 = this.months.map(item => {
        // let num  = this.randomIntFromInterval(150, 400);
        // return {x: item, y: num}
        // });

        this.palette = ["#72AC47", "#406326", "#204406"];
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            textField: 'x',
            clearSearchFilter:true,
            enableCheckAll:false,
            searchPlaceholderText:"Search Here",
            limitSelection:25
            
        };
        this.loadjQueryScripts();
        this.getItems();
        this.getMarketFilterItems();
    }

    public randomIntFromInterval(min: any, max: any): any { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public primaryXAxis1: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 },
        enableTrim: false,
        Intervel:1,    
        labelIntersectAction:'Rotate45',
        edgeLabelPlacement: 'Shift',
        // lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        
        minorGridLines: { width: 1 },
        // minorTickLines: { width: 0 },
    };
    //Initializing Primary Y Axis
    public primaryYAxis1: Object = {
        labelFormat: '${value} M',    
        edgeLabelPlacement: 'Shift',
        enableTrim: false,
        labelIntersectAction:'Rotate45',
        majorTickLines: { width: 0 },
        minorGridLines: { width: 1 },
        minimum: 0, maximum: 500, interval: 50,
    };

    public pointRender(args: IPointRenderEventArgs): void {
        let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
                '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
        args.fill = '#72AC47';
    };
    image :any ="/assets/images/bakery1.png"
    public radius: Object = { bottomLeft: 0, bottomRight: 0, topLeft: 5, topRight: 5 }
        public marker: Object = { 
        dataLabel: { 
            visible: true, 
            template: ""
            // '<div><div><img style="width:30px;height:30px;border-radius:18px;margin-left: -6px;" [src]="/assets/images/bakery1.png"></div></div>' 
            //template:'<div><div>${id}</div></div>',
            
        } }


        public title: string = '';
        public tooltip: Object = {
            enable: true
        };
        public legend: Object = {
            visible: false
        }
        public chartArea: Object = {
            border: {
                width: 0
            }
        };
        public width: string = Browser.isDevice ? '100%' : '98%';
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(
        (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(
            /-dark/i,
            'Dark'
        )
        );
    }
    
    private loadjQueryScripts(): void {    
        (($) => {
        "use strict";
        $('.knob').knob();

        $('#side_menu_bar > ul > li.nav-item > a').removeClass("active");
        $('#side_menu_bar > ul > li.nav-item > a#li_dashboard').addClass("active");
        })(jQuery);
    }
    
    onFileSelected(event:any){
        console.log(event.target.files[0]);
        const file =<File>event.target.files[0];
        this.uploadForm.patchValue({avatar:file});
        this.uploadForm.get('avatar')?.updateValueAndValidity();

        //file preview
        const reader = new FileReader();
        reader.onload=()=>{
        this.imageUrl =reader.result as string;
        }
        const [fileSelected,rest] = event.target.files[0].name.split(".");
        this.fileSelected = fileSelected;
        reader.readAsDataURL(file)
    }
    submitImage(){
        console.log("^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&777",this.uploadForm.value)
    }



    //temporarily Adding number  for multiselecter dropDown 
    public number:number=1;
    async getItems(){
        await this.bar_Service.getItemsData().subscribe((data:any)=>{
            this.categoryItems = data;
            this.categoryItems.map((itemsPerYr:any)=>{
                if(itemsPerYr.year ==new Date().getFullYear()){
                    this.multiSelectorData = itemsPerYr.data.map((itemData:any) => {
                        return {x: itemData.item, y: itemData.total, id: this.number++}
                    });
                }
            })
        })
    }
    async getMarketFilterItems(){
        await this.bar_Service.getMarketData().subscribe((marketData:any)=>{
            this.marketDataStore =marketData;
            this.selected = this.marketDataStore[0].item;
            this.nameOntoolTip=this.marketDataStore[0].item;
            this.marketDataStore[0].data.map((i:any)=>{
                const obj:any={}
                obj['x']=i.month;
                obj['y']=i.total;
                this.graphData =[...this.graphData,obj];
            })
        })
    }

    onSelectItem(event:any){
        this.graphData =[];
        this.nameOntoolTip=event.target.value;
        this.marketDataStore.map((i:any)=>{
            if(event.target.value === i.item){
                for(let j in i.data){
                    const obj:any={};
                    obj['x']=i.data[j].month;
                    obj['y']=i.data[j].total;
                    this.graphData = [...this.graphData,obj];
                }
            }
        })
        console.log("&&&&&&&&&&&&&&&&&&&&&",this.graphData);
    }

    // filteItemsOnYears(filterYear:any){
    //     this.multiSelectorData=[];
    //     this.categoryItems.map((itemsPerYr:any)=>{
    //         if(filterYear == itemsPerYr.year){
    //             this.multiSelectorData = itemsPerYr.data.map((itemData:any) => {
    //                 return {x: itemData.item, y: itemData.total,id:this.number++}
    //             });
    //         }
    //     })
    // }
    selectedItems:any = [];
    requiredField: boolean = false;
    setStatus() {
        
      (this.selectedItems.length > 0) ? this.requiredField = true : this.requiredField = false;
    }
    async onItemSelect(selected: any) {
        this.columnWidth = this.columnWidth + 0.01;


        if((typeof(this.height) == "string")=== true){
            const [s,rest]= this.height.split("%");
            this.height = parseInt(this.height) + 10;
            this.height = `${this.height}%`;
        }else{
            this.height ='20%'
        }
        await this.selectedItems.map((item:any)=>{
            for(let i in this.multiSelectorData){
                if(this.multiSelectorData[i].id === item.id){
                    item.y = this.multiSelectorData[i].y
                }
            }
        })

      //Do something if required
        this.setClass();
    }
    onItemDeSelect(unselected:any){
        this.selectedItems.map((item:any)=>{
            for(let i in this.multiSelectorData){
                if(this.multiSelectorData[i].id === item.id){
                    item.y = this.multiSelectorData[i].y
                }
            }
        })
        this.setClass();
    }
    onSelectAll(items:any) {
        items.map((item:any)=>{
            for(let i in this.multiSelectorData){
                if(this.multiSelectorData[i].id === item.id){
                    item.y = this.multiSelectorData[i].y
                }
            }
        })
        this.selectedItems =items;
        //this.setClass();
    }
  
    setClass() {
      this.setStatus();
      console.log("@",this.selectedItems)
      if (this.selectedItems.length > 0) { return 'validField' }
      else { return 'invalidField' }
    }


}


