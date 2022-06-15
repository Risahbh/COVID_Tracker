import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface,GoogleChartType  } from 'ng2-google-charts';
import { DataWiseData } from 'src/app/models/dateWiseData';
import { GlobalDataSummary } from 'src/app/models/globalData';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  totalConfirmed:any ;
  totalActive:any;
  totalDeaths:any;
  totalRecovered:any;
  selectedCountryData!  : DataWiseData[] ;
  dateWiseData:any;
  lineChart: GoogleChartInterface = {
    chartType: 'LineChart'
  }

  constructor(private dataService:DataServiceService) { }
  data? : GlobalDataSummary [];
  countries: any[]=[]

  ngOnInit(): void {

    this.dataService.getDateWiseData().subscribe((res2)=>{
      // console.log(res2);
      this.dateWiseData = res2;
      this.updateChart();
      
      
      
    })

    this.dataService.getGlobalData().subscribe((res)=>{
      this.data= res;
      // console.log(this.data, "gerhgeug");
      
      this.data.forEach(cs=>{
        this.countries.push(cs.country!)
      })

    })
  }

  updateChart(){
    let dataTable: any[] = [];
    dataTable.push(['Date', 'Cases'])
    this.selectedCountryData?.forEach(cs=>{
      dataTable.push([cs.date, cs.cases])
      //  console.log(this.selectedCountryData);
       console.log(dataTable);
       
       
    })
    this.lineChart  = {
      chartType: 'LineChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500
      },
    };
  }

  updateValues(country: any){
    this.data?.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active  
        this.totalDeaths = cs.deaths
        this.totalConfirmed = cs.confirmed
        this.totalRecovered = cs.recovered
      }
    })
    this.selectedCountryData= this.dateWiseData[country];
    this.updateChart();

  }


}
