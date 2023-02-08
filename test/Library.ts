import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

import { expect } from "chai";
import { ethers } from "hardhat";

import { Library } from "../typechain-types";

describe('Library', function (){
    let libraryFactory;
    let library: Library

    async function everyTime() {
        const [owner, otherAccount] = await ethers.getSigners();
        libraryFactory = await ethers.getContractFactory("Library");
        library = await libraryFactory.deploy();
        const book = [1,"XXX",10,5];
        await library.deployed();
        return { library, owner, otherAccount,book};
    }

    describe('Deployment',function() {
        it("Should set the right owner", async function(){
            const {library,owner} = await loadFixture(everyTime);
            expect(await library.owner()).to.equal(owner.address);
        })
    });

    describe("AddNewBook", function () {
       
        it("Should add book proper", async function(){
            const {book} = await loadFixture(everyTime);
            const addBookTx = await library.AddNewBook(book);
            await addBookTx.wait();
            let x = await library.books(1);
            expect(x.title).to.equal("XXX");
        });
 
        it("Should throw an error when try to add book with diferent address", async function() {
            const {book,otherAccount} = await loadFixture(everyTime);
            await expect(library.connect(otherAccount).AddNewBook(book)).to.be.revertedWith('only owner can do that')
        });
    });

    // describe("BorrowBook", function() {
    //     it("Should borrow proper books", async function(){
    //         const{book,otherAccount} = await loadFixture(everyTime);
    //         const addBookTx = await library.AddNewBook(book);
    //         await addBookTx.wait();
       
    //         expect(await library.connect(otherAccount).BorrowBook(1)).to.be.revertedWith("book doesn't exist in our library");
    //     })
    // })
})