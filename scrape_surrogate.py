
import csv
import re
import json
import urllib2

input_file = open('/Users/brian_jo/Desktop/Playground/text_to_emoji/dataset.csv')

input_url = 'http://www.fileformat.info/info/unicode/char/'
suffix = '/index.htm'

input_file.readline()

worddic = {}

i = 0
for line in input_file.readlines():
        html_id = str.split(line.strip(), ',')[0]
        anno = str.split(line.strip(), ',')[-1]
        anno_array = str.split(anno, ';')

        search_url = input_url + html_id + suffix

        try:
                conn = urllib2.urlopen(search_url)
                text = conn.read()
                ind = text.find('UTF-16 (decimal)')
                new_text = text[ind+43:]
                ind2 = new_text.find(' <')
                surr_code = new_text[:ind2]
                surr_code_int = str.replace(surr_code,',','')
                arr = str.split(surr_code_int," ")
        except:
                continue

        i = i+1
        if i%100 == 0:
                print str(i)

        if html_id not in worddic:
                worddic[html_id] = []
                if len(arr) == 2:
                        worddic[html_id].append('_'.join(arr))
                else:
                        worddic[html_id].append(arr[0])
        worddic[html_id] = worddic[html_id] + anno_array

        #print worddic[html_id]

with open('/Users/brian_jo/Desktop/Playground/text_to_emoji/jsondata.txt', 'w') as outfile:
        json.dump(worddic, outfile)

