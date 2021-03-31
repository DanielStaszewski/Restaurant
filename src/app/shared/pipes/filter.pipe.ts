import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/models/post.model';

@Pipe({
    name: 'appFilter'
})
export class FilterPipe implements PipeTransform{

    transform(items: Post[], searchText: string): Post[]{
        if(!items){
            return [];
        }
        if(!searchText){
            return items;
        }
        searchText = searchText.toLocaleLowerCase();
        return items.filter((item: Post) => {
            return item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) || 
            item.tags.some((tag: string) => tag.toLocaleLowerCase() === searchText.toLocaleLowerCase());
        });
    }

}
