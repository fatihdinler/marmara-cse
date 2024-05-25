class City {
	int id;
	int x;
	int y;
	
	public City(int id, int x, int y) {
		this.id = id;
		this.x = x;
		this.y = y;
	}
	
	public int getId() {
		return id;
	}
	
	public int getX() {
		return x;
	}
	
	public int getY() {
		return y;
	}
	
	public double distanceTo(City other) {
		return Math.round(Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)));
	}
	
	public static int distance(City c1, City c2) {
		return (int) Math.round(Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2)));
	}
	
	@Override
	public String toString() {
		return id + " (" + x + "," + y + ")";
	}
}