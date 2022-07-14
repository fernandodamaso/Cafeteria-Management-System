import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "buscaTags",
})
export class BuscaTagsPipe implements PipeTransform {
  transform(listItems: any[], tag: string) {
    if (tag) {
      return listItems.filter((item: any) => item.tag.toLowerCase().includes(tag));
    } else {
      return listItems;
    }
  }
}
