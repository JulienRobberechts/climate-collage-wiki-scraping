# Climate Collage Wiki Scrapping

This project extract some data from the ["Fresque du Climat" wiki ](https://fresqueduclimat.org/wiki/index.php?title=Jeu_adulte) to put them into a usable JSON format for the Climat Collage Memo.

The french version is in work in progress. The goal is to have a one click import in French and English.

## launch the program

It's suppose to run on your local machine with an internet access.

```cmd
yarn start
```

## launch tests

```cmd
yarn test
```
There are two types of tests:

- Some tests are done to check the generic behavior of the program.
- Some are to check that the data are what we expect. The targets used for that are files in the /data/targetv2 directory. Those targetv2 files are temporary and modified when the automatic result is better than the expected result. Those targetv2 files will probably be removed when the scrapper will be trusted enough.

