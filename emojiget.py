#python
import urllib
import sys
import os

#page = urllib.urlopen('http://unicode.org/emoji/charts/full-emoji-list.html')
#text = page.readlines()
#outputFile = open('dataset.txt', 'w')
#outputFile.writelines(text)
#outputFile.close()
#sys.exit(0)

if not os.path.exists("images/"):
	os.makedirs("images/")
#print text

htmlfile = open('data.html', 'r')
text = htmlfile.readlines()

outputFile = open('dataset.csv', 'w')

outputFile.write('code,b&w,apple,andr,twit,wind,gmail,name,annotations\n')

for i in range(len(text)):
	if "<td class='code'>" in text[i]:
		temp = ""
		loi = text[i]
		name = loi[loi.find('name=')+6:loi.find("'", loi.find('name=')+6)]
		temp = name + ","


		loi = text[i+2] #bw
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			bw_loc = 'images/' + name + '_bw.png'
			urllib.urlretrieve(image, bw_loc)
			temp = temp + bw_loc + ','

		loi = text[i+3] #apple
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			apple_loc = 'images/' + name + '_apple.png'
			urllib.urlretrieve(image, apple_loc)
			temp = temp + apple_loc + ','

		loi = text[i+4] #andr
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			andr_loc = 'images/' + name + '_andr.png'
			urllib.urlretrieve(image, andr_loc)
			temp = temp + andr_loc + ','

		loi = text[i+5] #twit
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			twit_loc = 'images/' + name + '_twit.png'
			urllib.urlretrieve(image, twit_loc)
			temp = temp + twit_loc + ','

		loi = text[i+6] #wind
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			browser_loc = 'images/' + name+ '_wind.png'
			urllib.urlretrieve(image, browser_loc)
			temp = temp + browser_loc + ','

		loi = text[i+7] #gmail
		if "td class='miss'" in loi:
			temp = temp + "missing,"
		else:
			image = loi[loi.find('src=')+5:loi.find("'", loi.find('src=')+5)]
			gmail_loc = 'images/' + name + '_gmail.png'
			urllib.urlretrieve(image, gmail_loc)
			temp = temp + gmail_loc + ','

		loi = text[i+11] #desc
		desc = loi[loi.find('>')+1:loi.find("<", loi.find('>'))]
		temp = temp + desc + ","

		loi = text[i+14]
		print loi
		ind = 0
		temp_ann = ""
		while True:
			if loi.find("annotate", ind) < 0:
				break
			ind = loi.find('annotate', ind)
			temp_ann = temp_ann + ";" + loi[ind+10:loi.find('<', ind)]
			ind += 1

		temp = temp + temp_ann[1:] + ","

		outputFile.write(temp[:-1] + "\n")

