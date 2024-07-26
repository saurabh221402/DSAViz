#include<iostream>
#include<vector>
using namespace std;

int givePivot(vector<int>& v,int start,int end)
{
    int pivot_ele = v[end],idx=start;

    for(int i=start;i<end;i++)
    {
        if(v[i] < pivot_ele)
        {
            swap(v[i],v[idx]);
            idx++;
        }
    }
    swap(v[idx],v[end]);
    //cout<<idx<< " ";
    return idx;
} 

void quickSort(vector<int>& v,int start,int end)
{
    if(start<end)
    {
        int pivot_idx = givePivot(v,start,end);
//cout<<pivot_idx<<" ";
        quickSort(v,start,pivot_idx-1);
        quickSort(v,pivot_idx+1,end);
    }
}
void merge(vector<int>& v,int i,int mid,int j)
{
    int start1 = i,end1=mid;
    int start2 = mid+1,end2=j;

    vector<int> temp(j-i+1);

    int k=0;
    for(i=start1,j=start2;i<=end1&&j<=end2;k++)
    {
        if(v[i]>v[j])
        {
            temp[k] = v[j];
            j++;
        }
        else
        {
            temp[k] = v[i];
            i++;
        }
    }
    while(i<=end1)
    {
        temp[k]=v[i];
        i++,k++;
    }
    while(j<=end2)
    {
        temp[k]=v[j];
        j++,k++;
    }
    for(int i=start1;i<=end2;i++)
    {
        v[i]=temp[i-start1];
    }
}

void mergeSort(vector<int>& v,int start,int end)
{
    if(start<end)
    {
        int mid = start + (end - start)/2;

        mergeSort(v,start,mid);
        mergeSort(v,mid+1,end);

        merge(v,start,mid,end);
    }
}

void insertionSort(vector<int>&v,int n)
{
    for(int i=0;i<n-1;i++)
    {
        int idx = i;
        for(int j=i+1;j>=1;j--)
        {
            if(v[j] < v[j-1])
            {
                swap(v[j],v[j-1]); 
            }
            else
            {
                break;
            }
        }
    }
}

void selectionSort(vector<int>&v,int n)
{
    int min_from_unsorted_part_of_array,index_of_minEle_to_be_swap_with_first_element_of_unsorted_part ;
    for(int i=0;i<n;i++)
    {
        min_from_unsorted_part_of_array = v[i];
        index_of_minEle_to_be_swap_with_first_element_of_unsorted_part=i;
        for(int j=i;j<n;j++)
        {
            if(min_from_unsorted_part_of_array>v[j])
            {
                min_from_unsorted_part_of_array = v[j];
                index_of_minEle_to_be_swap_with_first_element_of_unsorted_part = j;
            }
        }
        //cout<<index_of_minEle_to_be_swap_with_first_element_of_unsorted_part<<" .";
        swap(v[index_of_minEle_to_be_swap_with_first_element_of_unsorted_part],v[i]);
    }
}

void bubbleSort(int n,vector<int>& v)
{
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n-i-1;j++)
        {
            if(v[j+1]<v[j])swap(v[j+1],v[j]);
        }
    }
}
void printList(vector<int>& v)
{
    int n=v.size();
    for(int i=0;i<n;i++)cout<<v[i]<<" ";
}
int main()
{
    int n;
    cout<<"enter size of array :";
    cin>>n;
    vector<int> list(n);
    cout<<"enter all element of list :";
    for(int i=0;i<n;i++)cin>>list[i];
   // bubbleSort(n,list);
   // selectionSort(list,n);
   // insertionSort(list,n);
   // mergeSort(list,0,n-1);
   quickSort(list,0,n-1);
    printList(list);
    return 0;
}