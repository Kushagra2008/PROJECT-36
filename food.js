class Food
{
    constructor()
    {
        this.foodstock = foodS;
        this.lastfed;
        this.foodImage = loadImage("Milk.png");
    }
    getFoodStock()
    {
        return this.foodStock
    }
    updateFoodStock()
    {
        this.foodstock = foodS
    }
    deductFood()
    {
        if (this.foodStock > 0)
        {
            this.foodStock -= 1;
        }
    }
    getFeedTime(lastFed)
    {
        this.lastfed = lastFed
    }
    display()
    {
        var x = 80 
        var y = 100;

        // imageMode(CENTER);
        // image(this.image, 720, 220);

        if (this.foodstock != 0)
        {
            for (var i = 0;i < this.foodstock; i++)
            {
                if (i%10 == 0)
                {
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y)
                x += 30;
            }
        }
    }
}
