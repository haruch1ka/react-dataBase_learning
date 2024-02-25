export default class TodoUpDateData{
  private id:string;
  private updateData:string;
  private column:"content" | "due_date"

  constructor (id: string ,updateData :stirng ,column:"content"|"due_date"){
    this.id = id;
    this.updateData = updateData ;
    this.column = column;

  }
  
}