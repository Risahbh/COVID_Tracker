import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GoogleChartComponent, GoogleChartInterface } from 'ng2-google-charts';
import { GlobalDataSummary } from 'src/app/models/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  totalConfirmed=0;
  totalActive= 0;
  totalDeaths=0;
  totalRecovered=0;
  globalData?: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart'
  }
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart'
  }
  datatable:any=[];
  value: any=[];


  constructor(private dataService:DataServiceService) {
   
   }



  ngOnInit(): void {
   
  
    
   
  }
  ngAfterViewInit(): void {
    this.dataService.getGlobalData().subscribe((res)=>{
      console.log(res);
      this.globalData = res;

      res.forEach(cs=>{
        if(!Number.isNaN(cs.confirmed)){
          this.totalActive += cs.active!;
          this.totalConfirmed +=cs.confirmed!;
          this.totalDeaths +=cs.deaths!;
          this.totalRecovered +=cs.recovered!;
        }
        
      });
      this.initChart('c');
    });
  }


  change(input: HTMLInputElement){
    console.log(input.value);
    // location.reload();
    this.initChart(input.value);
  }
  initChart(caseType: string) {

    // this.datatable = [];
    this.datatable.push(["Country", "Cases"])
    
    this.globalData?.forEach(cs => {
       this.value  ;
      if (caseType == 'c')
        if (cs.confirmed! > 2000)
          this.value = cs.confirmed
          
      if (caseType == 'a')
        if (cs.active! > 2000)
          this.value = cs.active
      if (caseType == 'd')
        if (cs.deaths! > 1000)
        this.value = cs.deaths
          
      if (caseType == 'r')
        if (cs.recovered! > 2000)
        this.value = cs.recovered
        

        this.datatable.push([
            cs.country,  this.value
          ])
    })
    console.log(this.datatable);

  
        
    //  else if(caseType === 'a'){
    //   if(cs.active! > 2000){
    //     value = cs.active
    //     this.datatable.push([
    //       cs.country, value
    //             ])
          
    //    }
    //  }
       
       
    //  else if(caseType === 'd'){
    //   if(cs.deaths! > 1000){
    //     value = cs.deaths
    //     this.datatable.push([
    //       cs.country, value
    //             ])
          
    //   }
    //  }
      
        
    // else  if(caseType === 'r'){
    //   if(cs.recovered! > 2000){
    //     value = cs.recovered
    //     this.datatable.push([
    //       cs.country, value
    //             ])
          
    //   }
    // }
      

      // if(cs.recovered!> 2000)


      
    

    this.pieChart = {
      chartType: 'PieChart',
      dataTable: this.datatable,
      //firstRowIsData: ture,
      options: {
        height : 500,
        is3D: true,
        animation:{
          duration: 1000,
          easing: 'out',
        }
      },
      
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: this.datatable,
      //firstRowIsData: ture,
      options: {
        height : 500
      }
    };
  }
  

    
  }

  
  
  


